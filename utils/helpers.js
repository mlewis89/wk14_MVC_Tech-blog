module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_commentIdText: (id) => {
    return `commentid-${id}`;
  },
  get_postIdText: (id) => {
    return `postid-${id}`;
  },
};