import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'

interface AnswersQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
type AnswersQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>
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

    return right({ answer })
  }
}
