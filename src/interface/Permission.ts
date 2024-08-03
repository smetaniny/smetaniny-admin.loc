export interface Permission {
    id: number;                  // Идентификатор права
    name: string;                // Название права
    description: string;         // Описание права
    group_permission_id: number; // Идентификатор группы прав
}
