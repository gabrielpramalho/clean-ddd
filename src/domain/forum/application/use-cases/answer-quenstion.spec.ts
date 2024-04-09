/* eslint-disable @typescript-eslint/no-unused-vars */
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeAnswersRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeAnswersRepository)

  const {question} = await createQuestion.execute({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
