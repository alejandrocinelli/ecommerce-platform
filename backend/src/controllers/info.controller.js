import args from "../yargs.js";

const info = (req, res) => { 
    console.log("entro al info")
    res.render("info", {
    entryArgs: JSON.stringify(args),
    platform: process.platform,
    versionNode: process.version,
    memory: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    dir: process.cwd(),
}) }

export const infoController = { info };