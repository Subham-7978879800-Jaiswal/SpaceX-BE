// * Generic Payloads looks like this:
// {
//   payloads: [
//     {
//       customers: ["DARPA"],
//       id: "5eb0e4b5b6c3bb0006eeb1e1",
//     },
//   ],
// };

const getCustomers = (payloads) => {
  const allCustomers = [];
  payloads.map(({ customers }) => {
    allCustomers.push(...customers);
  });

  return Array.from(new Set(allCustomers));
};

module.exports = { getCustomers };
