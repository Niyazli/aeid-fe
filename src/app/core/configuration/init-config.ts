/**
 * Allows this to use this as factory
 *
 * @param {ConfigService} configService
 */
import {ConfigService} from './services';

const initConfig = (configService: ConfigService) => () => configService.loadConfig();

export {initConfig};
