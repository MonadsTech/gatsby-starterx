import chalk from 'chalk'
import cp from 'child_process'
import path from 'path'
import clear from 'clear'
import figlet from 'figlet'
import inquirer from 'inquirer'

const starterList = {
    basic : {
        key: 'basic',
        label: 'Gatsby Hello World',
        url : 'https://github.com/gatsbyjs/gatsby-starter-hello-world'
    },
    gcn: {
        key:'gcn',
        label: 'Contentful Starter',
        url:  'https://github.com/ryanwiemer/gatsby-starter-gcn.git'
    }
}
type StarterTypeKeys = keyof typeof starterList;

const starterTypes = Object.values(starterList);
const startersForInquirer = starterTypes.map(s => ({name: s.label, value: s.key, short: s.key}));

export const installGatsbyInit = async () => {
  clear()
  console.log(
    chalk.green(
      figlet.textSync('Gatsby-StarterX', { horizontalLayout: 'full' })
    )
  )

  const answers = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of gatsby project',
        default: 'hello-world',
      },
      {
          type:'list',
          name: 'type',
          message: 'Choose Starter Template',
          choices: startersForInquirer,
      }
    ])
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })

    const projectName  = answers.name;
    const starterType = answers.type as StarterTypeKeys;
  
    const commandStr = `npx gatsby new '${projectName}' ${starterList[starterType].url}`
     
    await cp.execSync(commandStr, {
        // cwd: rootDir,
        stdio: 'inherit',
    })

}
