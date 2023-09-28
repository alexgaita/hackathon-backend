const { apartmentLogic, calendarLogic } = require('../logic');

const { Op } = require('sequelize');
const fs = require('fs');
const { parse } = require('csv-parse');
const dayjs = require('dayjs');
const { validateMessage } = require('./process');

const associateTo = (collection, keySelector, destinationIndex) => {
  collection.forEach((value) =>
    destinationIndex.set(keySelector(value), value)
  );
  return destinationIndex;
};

const associateBy = (collection, keySelector) => {
  return associateTo(collection, keySelector, new Map());
};

module.exports = {
  saveApartments: async () => {
    const apartmentData = [];
    fs.createReadStream('./listings.csv')
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        apartmentData.push({
          referenceId: Number(row[0]),
          link: row[1],
          name: row[5],
          imageUrl: row[8],
          address: row[28] + row[27],
          price: Number(row[40].split('$')[1]),
        });
      })
      .on('end', async function (row) {
        const actualApartments = await apartmentLogic.bulkCreate(apartmentData);

        const apartmentsGroupedByReferenceId = associateBy(
          actualApartments,
          ({ referenceId }) => referenceId
        );
        const calendarData = [];
        let count = 0;
        fs.createReadStream('./calendar.csv')
          .pipe(parse({ delimiter: ',', from_line: 2 }))
          .on('data', function (row) {
            if (
              !apartmentsGroupedByReferenceId.get(row[0])?.id ||
              row[2] !== 't' ||
              row[1] > '2024-01-01'
            ) {
              console.log(
                'skip',
                apartmentsGroupedByReferenceId.get(row[0])?.id,
                row[0],
                row[1],
                row[2]
              );
              return;
            }
            console.log(count);
            count = count + 1;
            calendarData.push({
              ApartmentId: apartmentsGroupedByReferenceId.get(row[0]).id,
              date: row[1],
              available: row[2] === 't',
            });
          })
          .on('end', async () => {
            await calendarLogic.bulkCreate(calendarData);
          });
      });
  },

  getAllFilteredApartments: async (body) => {
    const validatedResponse = await validateMessage(body);

    // const validatedResponse = {
    //   data: {
    //     Location: 'Berg',
    //     Start: '2023-05-01',
    //     End: '2023-07-01',
    //     Price: 500,
    //   },
    // };

    console.log(validatedResponse);

    const availableApartments = await calendarLogic.findAndCountAll({
      date: {
        [Op.between]: [
          dayjs(validatedResponse.data.Start).format('YYYY-MM-DD'),
          dayjs(validatedResponse.data.End).format('YYYY-MM-DD'),
        ],
      },
    });

    const apartmentsResponse = await apartmentLogic.findAndCountAll({
      referenceId: {
        [Op.in]: availableApartments.rows.map((it) => String(it.id)),
      },
      price: {
        [Op.lte]: Number(validatedResponse.data.Price),
      },
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${validatedResponse.data.Location}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${validatedResponse.data.Location}%`,
          },
        },
      ],
    });

    return {
      data: apartmentsResponse,
    };
  },
};
