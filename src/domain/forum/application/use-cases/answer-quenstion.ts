import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswersQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
interface AnswersQuestionUseCaseResponse {
  answer: Answer
}

export class AnswersQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswersQuestionUseCaseRequest): Promise<AnswersQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answerRepository.create(answer)

    return {
      answer,
    }
  }
}
