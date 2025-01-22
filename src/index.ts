// Interfaces para os dados do usuário e repositórios
interface GitHubUser {
    id: number;
    login: string;
    name: string;
    bio: string;
    public_repos: number;
    url: string;
}

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    description: string | null;
}

// Array global para armazenar os usuários
const users: GitHubUser[] = [];

// Função 1: Obter dados do usuário do GitHub
async function fetchGitHubUser(username: string): Promise<void> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro: ${errorData.message}`);
            return;
        }

        const userData: GitHubUser = await response.json();
        users.push(userData);
        alert(`Usuário ${userData.name} adicionado com sucesso!`);
    } catch (error) {
        alert(`Erro ao buscar usuário: ${(error as Error).message}`);
    }
}

// Função 2: Mostrar informações do usuário e seus repositórios
async function showUserInfo(username: string): Promise<void> {
    const user = users.find(u => u.login === username);
    
    if (!user) {
        alert('Usuário não encontrado na lista!');
        return;
    }

    try {
        const reposResponse = await fetch(`${user.url}/repos`);
        if (!reposResponse.ok) {
            alert('Erro ao buscar repositórios do usuário.');
            return;
        }

        const repos: GitHubRepo[] = await reposResponse.json();

        if (repos.length === 0) {
            alert(`Usuário ${user.name} não possui repositórios públicos.`);
            return;
        }

        let repoInfo = `Usuário: ${user.name}\nBio: ${user.bio}\nRepositórios:\n`;
        repos.slice(0, 5).forEach(repo => {
            repoInfo += `- ${repo.name} (Descrição: ${repo.description || 'Sem descrição'}, Privado: ${repo.private})\n`;
        });

        alert(repoInfo);
    } catch (error) {
        alert(`Erro ao buscar informações: ${(error as Error).message}`);
    }
}

// Função 3: Mostrar todos os usuários salvos
function showAllUsers(): void {
    if (users.length === 0) {
        alert('Nenhum usuário salvo.');
        return;
    }

    let userInfo = 'Usuários salvos:\n';
    users.forEach(user => {
        userInfo += `Nome: ${user.name}, Login: ${user.login}, Repositórios: ${user.public_repos}\n`;
    });

    alert(userInfo);
}

// Função 4: Calcular a soma de repositórios dos usuários
function calculateTotalRepos(): void {
    const totalRepos = users.reduce((sum, user) => sum + user.public_repos, 0);
    alert(`Total de repositórios públicos de todos os usuários: ${totalRepos}`);
}

// Função 5: Mostrar os top 5 usuários com mais repositórios
function showTopUsers(): void {
    const topUsers = [...users].sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);

    if (topUsers.length === 0) {
        alert('Nenhum usuário salvo.');
        return;
    }

    let topUserInfo = 'Top 5 usuários com mais repositórios:\n';
    topUsers.forEach(user => {
        topUserInfo += `Nome: ${user.name}, Repositórios: ${user.public_repos}\n`;
    });

    alert(topUserInfo);
}

// Função para exibir o menu interativo
function showMenu(): void {
    let option: string;
    do {
        option = prompt(
            'Escolha uma opção:\n' +
            '1. Obter dados do usuário do GitHub\n' +
            '2. Mostrar informações do usuário e seus repositórios\n' +
            '3. Mostrar todos os usuários salvos\n' +
            '4. Calcular a soma de repositórios\n' +
            '5. Mostrar top 5 usuários com mais repositórios\n' +
            '6. Sair'
        ) || '';

        switch (option) {
            case '1':
                const username = prompt('Insira o nome de usuário do GitHub:') || '';
                fetchGitHubUser(username);
                break;
            case '2':
                const userToShow = prompt('Insira o nome de usuário do GitHub para mostrar informações:') || '';
                showUserInfo(userToShow);
                break;
            case '3':
                showAllUsers();
                break;
            case '4':
                calculateTotalRepos();
                break;
            case '5':
                showTopUsers();
                break;
            case '6':
                alert('Saindo do menu.');
                break;
            default:
                alert('Opção inválida! Tente novamente.');
        }
    } while (option !== '6');
}

// Inicia o menu interativo
showMenu();
