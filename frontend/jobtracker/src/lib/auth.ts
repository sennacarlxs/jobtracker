type User = {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string | null;
};

type AuthResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

type ApiErrorCode = "VALIDATION_ERROR" | "CONFLICT" | "UNAUTHORIZED";

class ApiError extends Error {
    code: ApiErrorCode;
    status: number;

    constructor(code: ApiErrorCode, status: number, message: string) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

type StoredUser = User & { password: string };

const USERS_KEY = "jobtracker:mock-users";
const SESSION_KEY = "jobtracker:session";

function getStoredUsers(): StoredUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeTokens(userId: string) {
    const rand = () => Math.random().toString(36).slice(2);
    return {
        accessToken: `mock-access.${userId}.${rand()}`,
        refreshToken: `mock-refresh.${userId}.${rand()}`,
    };
}

function toPublicUser({ password: _password, ...user }: StoredUser): User {
    return user;
}

function saveSession(response: AuthResponse) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(response));
}

function delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
    await delay();

    if (!name || !email || !password) {
        throw new ApiError("VALIDATION_ERROR", 400, "Preencha todos os campos.");
    }

    const users = getStoredUsers();
    if (users.some((user) => user.email === email)) {
        throw new ApiError("CONFLICT", 409, "Este e-mail já está cadastrado.");
    }

    const user: StoredUser = {
        id: crypto.randomUUID(),
        name,
        email,
        profilePictureUrl: null,
        password,
    };
    users.push(user);
    saveStoredUsers(users);

    const response: AuthResponse = { user: toPublicUser(user), ...makeTokens(user.id) };
    saveSession(response);
    return response;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    await delay();

    const user = getStoredUsers().find((u) => u.email === email && u.password === password);
    if (!user) {
        throw new ApiError("UNAUTHORIZED", 401, "E-mail ou senha inválidos.");
    }

    const response: AuthResponse = { user: toPublicUser(user), ...makeTokens(user.id) };
    saveSession(response);
    return response;
}

export function getSession(): AuthResponse | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function logout() {
    localStorage.removeItem(SESSION_KEY);
}

export { ApiError };
export type { AuthResponse, User };
