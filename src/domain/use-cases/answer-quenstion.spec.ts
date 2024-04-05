import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-quenstion'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova Resposta',
  })
  
  expect(answer.content).toEqual('Nova Resposta')
})