import {spawn} from 'child_process'

// returns stdout combined with stderr
async function cmd(command, ...args) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, {
            env: process.env,
            cwd: process.cwd(),
            shell: true
        })
        proc.stdout.on('data', d => console.log(String(d)))
        proc.stderr.on('data', d => console.error(String(d)))
        proc.on('close', code => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(command + " returned non-zero exit code: " + code))
            }
        })
    })
}

async function run() {
    await cmd("npm", "run", "build").then(
        () => cmd("open-cli", "http://localhost:10420")
    )
    await Promise.all([
        cmd("npm", "run", "build:watch"),
        cmd("cross-env", "DEPLOY_MODE=dev", "nodemon", "--watch", "src", "start.js"),
        cmd("livereload -p 13420 ./src/public")
    ])
}

run().then(() => {
    console.log("Dev environment stopped.")
}).catch(e => {
    console.error("Dev environment crashed: ", e)
})