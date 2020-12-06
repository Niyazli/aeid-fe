import {UpdateTranslationByIdDto} from './update-translation-by-id.dto';

class UpdateSeveralTranslationsDto {
  wordId: string;
  translations: UpdateTranslationByIdDto[];
}

export { UpdateSeveralTranslationsDto };
