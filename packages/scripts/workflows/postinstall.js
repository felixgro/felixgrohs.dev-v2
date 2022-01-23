const { exec } = require('child_process');
const hooks = ['pre-push'];

const executeCommands = (commands) => {
	const command = commands.join(' && ');
	exec(command, (error, stdout) => {
		if (error) return console.log(error);
		console.log(stdout);
	});
};

const commands = [];

// build common package
commands.push('echo "Building @felixgrohs/common.."');
commands.push('cd ./packages/common');
commands.push('yarn build');
commands.push('cd ./../../');

// install git hooks
for (const hook of hooks) {
	commands.push(`echo "Installing ${hook} githook.."`);
	commands.push(`chmod +x ./packages/scripts/githooks/${hook}`);
}

commands.push('cd .git/hooks');

for (const hook of hooks) {
	commands.push(`ln -s -f ../../packages/scripts/githooks/${hook} ${hook}`);
}

commands.push('echo "Done."');

executeCommands(commands);
