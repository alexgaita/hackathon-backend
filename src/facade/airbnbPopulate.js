const { apartmentLogic, calendarLogic } = require('../logic');

const fs = require('fs');
const { parse } = require('csv-parse');

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
  airbnbPopulate: async () => {
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
            console.log(count);
            count = count + 1;
            if (!apartmentsGroupedByReferenceId[row[0]]?.id || row[2] !== 't')
              return;
            calendarData.push({
              ApartmentId: Number(apartmentsGroupedByReferenceId[row[0]].id),
              date: row[1],
              available: row[2] === 't',
            });
          })
          .on('end', () => {
            calendarLogic.bulkCreate(calendarData);
          });
      });
  },
};
