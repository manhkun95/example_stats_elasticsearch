var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const timeStamp = new Date(new Date().getTime() - 12 * 24 * 60 * 60 * 1000);
// client.create({
//   index: "ecblockchain",
//   type: "orders",
//   id: '8',
//   body: {
//     totalPrice: 2.6,
//     createdAt: timeStamp,
//     updatedAt: timeStamp,
//   }
// })

const data = client.search({
  index: "ecblockchain",
  type: "orders",
  body: {
    size: 0,
    aggs: {
      statistic: {
        date_histogram: {
          field: "createdAt",
          interval: "week"
        },
        aggs: {
          revenue: {
            sum: {
              field: "totalPrice"
            }
          }
        }
      },
    },
    query: {
      range: {
        createdAt: {
          gte: timeStamp,
          lte: new Date()
        }
      }
    }
  }
})