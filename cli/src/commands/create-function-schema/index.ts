import { Args, Command, Flags } from '@oclif/core'
import fs from 'fs'
import * as path from 'path'

export default class CreateFunctionSchema extends Command {
  static args = {
    function: Args.string({ description: 'Function to add schema to.', required: true }),
  }

  static description = 'Add schema boilerplate to a function.'

  static flags = {}

  async run(): Promise<void> {
    const { argv } = await this.parse(CreateFunctionSchema)
    var templatePath = path.join(process.cwd(), '/../templates/function/schema')
    var functionsPath = path.join(process.cwd(), '/../functions')
    var functionDirectory = functionsPath + '/' + this.argv[0];
    var filepath = functionsPath + '/' + this.argv[0] + '/' + this.argv[0] + '.js';
    await fs.readFile(filepath, (err, data) => {
      if (!err && data) {
        console.log(filepath + " exists. \n");
        console.log('Adding schema to /functions/' + this.argv[0] + '/schema \n')
        fs.cpSync(templatePath, functionDirectory + '/schema', { recursive: true });
      }
    })



  }
}
