import { CreateChallengeSubmission } from "./create-challenge-submission";
import { inMemoryStudentsRepository } from "../../../tests/repositories/in-memory-students-repository"
import { inMemoryChallengesRepository } from "../../../tests/repositories/in-memory-challenges-repository"
import { Student } from "../../domain/entities/student";
import { Challenge } from "../../domain/entities/challenge";

describe('Create challenge submission use case', () => {
  it('Should be able to create a new challenge submission', async () => {
    const studentsRepository = new inMemoryStudentsRepository();
    const challengesRepository = new inMemoryChallengesRepository();

    const student = Student.create({
      name: 'Diego',
      email: 'doe@example.com',
    });

    const challenge = Challenge.create({
      name: 'Diego',
      instructionsUrl: 'http://example.com',
    })

    studentsRepository.items.push(student);
    challengesRepository.items.push(challenge);

    const sysUnderTest = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository,
    );

    const response = await sysUnderTest.execute({
      studentId: student.id,
      challengeId: challenge.id
    });

    expect(response).toBeTruthy();
  });
});