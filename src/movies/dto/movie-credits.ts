class MovieCast {
  readonly adult: boolean;

  readonly gender: number;

  readonly id: number;

  readonly known_for_department: string;

  readonly name: string;

  readonly original_name: string;

  readonly popularity: number;

  readonly profile_path: string;

  readonly cast_id: number;

  readonly character: string;

  readonly credit_id: string;

  readonly order: number;
}

class MovieCrew {
  readonly adult: boolean;

  readonly gender: number;

  readonly id: number;

  readonly known_for_department: string;

  readonly name: string;

  readonly original_name: string;

  readonly popularity: number;

  readonly profile_path: string;

  readonly credit_id: string;

  readonly department: string;

  readonly job: string;
}

export class MovieCredits {
  readonly id: number;

  readonly cast: MovieCast[];

  readonly crew: MovieCrew[];
}
