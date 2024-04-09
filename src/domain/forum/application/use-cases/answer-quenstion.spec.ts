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
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(answer.content).toBeTruthy()
    expect(inMemoryAnswersQuestion.items[0].id).toEqual(answer.id)
  })
})
