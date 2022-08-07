import { Container } from 'inversify'
import { App } from './app'

export type IMain = () => { app: App; appContainer: Container }
