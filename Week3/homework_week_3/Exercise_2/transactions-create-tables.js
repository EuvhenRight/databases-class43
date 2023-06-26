const createTableAccount = `
CREATE TABLE IF NOT EXISTS Account (
    account_number INT PRIMARY KEY,
    balance FLOAT
  )`;

const createTableAccount_changes = `CREATE TABLE IF NOT EXISTS \`Account_changes\` (
    change_number INT PRIMARY KEY,
    account_number INT,
    amount FLOAT,
    changed_date DATE,
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES \`Account\`(account_number)
  );
`;

module.exports = {
  createTableAccount,
  createTableAccount_changes,
};
