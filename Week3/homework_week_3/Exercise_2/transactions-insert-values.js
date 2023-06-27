const insertValuesTables = `INSERT INTO Account (account_number, balance)
VALUES
  (101, 2000),
  (102, 2500)`;

// Add value to table account_changes
const insertValuesTransaction = (accountFrom, accountTo, amountChange) => {
  const query = `INSERT INTO Account_changes (change_number, account_number, amount, changed_date, remark)
    VALUES
      (1, ${accountTo}, + ${amountChange}, '2023-06-25', 'Transfer from account 101'),
      (2, ${accountFrom}, - ${amountChange}, '2023-06-25', 'Transfer to account 102')
      `;
  return query;
};

// Update table account
const updateValues = (accountFrom, accountTo, balanceChange) => {
  const query = `
    UPDATE Account
    SET balance = CASE 
      WHEN account_number = ${accountFrom} THEN balance - ${balanceChange}
      WHEN account_number = ${accountTo} THEN balance + ${balanceChange}
      ELSE balance
    END;
  `;
  return query;
};
module.exports = { insertValuesTables, insertValuesTransaction, updateValues };
