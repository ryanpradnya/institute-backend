const bcrypt = require('bcryptjs');

const Program = require('../models/program');
const Admin = require('../models/admin');

const config = require('../util/config');

exports.initiateApp = async () => {

    try {
        const technologyProgram = await Program.findOne({ programName: 'technology' });
        if (!technologyProgram) {
            const program = new Program({
                programName: 'technology',
                percentage: 0.4
            });
            await program.save();

            console.log('Technology program created')
        }

        const economyProgram = await Program.findOne({ programName: 'economy' });
        if (!economyProgram) {
            const program = new Program({
                programName: 'economy',
                percentage: 0.2
            });
            await program.save();

            console.log('Economy program created')
        }

        const managementProgram = await Program.findOne({ programName: 'management' });
        if (!managementProgram) {
            const program = new Program({
                programName: 'management',
                percentage: 0.2
            });
            await program.save();

            console.log('Management program created')
        }

        const healthProgram = await Program.findOne({ programName: 'health' });
        if (!healthProgram) {
            const program = new Program({
                programName: 'health',
                percentage: 0.2
            });
            await program.save();

            console.log('Health program created')
        }

        const result = await Admin.findOne({ adminEmail: 'admin@hexainstitute.com' });
        if (!result) {
            const hashedPw = await bcrypt.hashSync(config.adminPassword, 12);
            const admin = new Admin({
                adminName: config.adminName,
                adminEmail: config.adminEmail,
                adminPassword: hashedPw
            });
            await admin.save();

            console.log('Admin created')
        }

    } catch (err) {
        throw err;
    }
};