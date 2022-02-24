const mongoose = require('mongoose');
async function main() {
  await mongoose.connect('mongodb://localhost:27017/bd_func');
  console.log('Conectou ao MongoDB com sucesso!');
}
main().catch((err) => console.log(err));
module.exports = mongoose;
