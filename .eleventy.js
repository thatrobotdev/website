/*
    "static_folders" is a directory full of directories (ex. XCode projects)
    that we want to zip up and include as a downloadable file. This function
    zips up each directory in "static_folders" and creates the zip file in
    the "static" directory. 

    The "static" directory is later copied over to the resulting build of the
    site with 11ty's Passthrough File Copy (https://www.11ty.dev/docs/copy/)
*/
function zipStaticFolders(folderPathName) {
    // Inport required modules
    const fs = require('fs');
    const path = require('path');
    const archiver = require('archiver');

    const folderPath = path.resolve(__dirname, folderPathName);

    // Read static folders
    const results = fs.readdirSync(folderPath);

    // Get all folders inside static folders
    const folders = results.filter(res => fs.lstatSync(path.resolve(folderPath, res)).isDirectory());

    // Create a .zip file for each static folder
    folders.forEach(folder => {
        // Create a file to stream archive data to.
        const output = fs.createWriteStream(__dirname + `/static/${folder}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // Listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function() {
            console.log(`[zipStaticDirectories] Zipped ${folderPath}/${folder} to static/${folder}.zip (${archive.pointer()} total bytes)`);
        });

        // Catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
        });

        // Catch this error explicitly
        archive.on('error', function(err) {
            throw err;
        });

        // Pipe archive data to the file
        archive.pipe(output);

        // Add the archive to the zip
        archive.directory(`${folderPathName}/${folder}/`, false)

        // Finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        archive.finalize();
    });
}

module.exports = function (eleventyConfig) {
    zipStaticFolders("static_folders");

	// Output directory: _site

	// Copy `static/` to `_site/static`
    eleventyConfig.addPassthroughCopy("static");
    
    // Emulate passthrough copy during "--serve"
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};