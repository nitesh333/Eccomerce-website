const bcrypt = require('bcryptjs');
async function run() {
    const hash = await bcrypt.hash("shiyam67277", 10);
    console.log("THE_HASH=" + hash);
}
run();
