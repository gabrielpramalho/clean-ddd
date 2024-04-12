import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersQuestionUseCase } from './answer-quenstion'

let inMemoryAnswersQuestion: InMemoryAnswersRepository
let sut: AnswersQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswersQuestion = new InMemoryAnswersRepository()
    sut = new AnswersQuestionUseCase(inMemoryAnswersQuestion)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Content answer',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersQuestion.items[0]).toEqual(result.value?.answer)
  })
})
