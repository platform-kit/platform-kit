import { Command } from '@oclif/core'

export default class World extends Command {
  static args = {}

  static description = 'Say hello.'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello there!`,
  ]

  static flags = {}
// TODO 
  async run(): Promise<void> {
    console.log('Hello there!')
  }
}
