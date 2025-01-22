var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Array global para armazenar os usuários
var users = [];
// Função 1: Obter dados do usuário do GitHub
function fetchGitHubUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, userData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username))];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    alert("Erro: ".concat(errorData.message));
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    userData = _a.sent();
                    users.push(userData);
                    alert("Usu\u00E1rio ".concat(userData.name, " adicionado com sucesso!"));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    alert("Erro ao buscar usu\u00E1rio: ".concat(error_1.message));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Função 2: Mostrar informações do usuário e seus repositórios
function showUserInfo(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user, reposResponse, repos, repoInfo_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = users.find(function (u) { return u.login === username; });
                    if (!user) {
                        alert('Usuário não encontrado na lista!');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(user.url, "/repos"))];
                case 2:
                    reposResponse = _a.sent();
                    if (!reposResponse.ok) {
                        alert('Erro ao buscar repositórios do usuário.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, reposResponse.json()];
                case 3:
                    repos = _a.sent();
                    if (repos.length === 0) {
                        alert("Usu\u00E1rio ".concat(user.name, " n\u00E3o possui reposit\u00F3rios p\u00FAblicos."));
                        return [2 /*return*/];
                    }
                    repoInfo_1 = "Usu\u00E1rio: ".concat(user.name, "\nBio: ").concat(user.bio, "\nReposit\u00F3rios:\n");
                    repos.slice(0, 5).forEach(function (repo) {
                        repoInfo_1 += "- ".concat(repo.name, " (Descri\u00E7\u00E3o: ").concat(repo.description || 'Sem descrição', ", Privado: ").concat(repo.private, ")\n");
                    });
                    alert(repoInfo_1);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    alert("Erro ao buscar informa\u00E7\u00F5es: ".concat(error_2.message));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Função 3: Mostrar todos os usuários salvos
function showAllUsers() {
    if (users.length === 0) {
        alert('Nenhum usuário salvo.');
        return;
    }
    var userInfo = 'Usuários salvos:\n';
    users.forEach(function (user) {
        userInfo += "Nome: ".concat(user.name, ", Login: ").concat(user.login, ", Reposit\u00F3rios: ").concat(user.public_repos, "\n");
    });
    alert(userInfo);
}
// Função 4: Calcular a soma de repositórios dos usuários
function calculateTotalRepos() {
    var totalRepos = users.reduce(function (sum, user) { return sum + user.public_repos; }, 0);
    alert("Total de reposit\u00F3rios p\u00FAblicos de todos os usu\u00E1rios: ".concat(totalRepos));
}
// Função 5: Mostrar os top 5 usuários com mais repositórios
function showTopUsers() {
    var topUsers = __spreadArray([], users, true).sort(function (a, b) { return b.public_repos - a.public_repos; }).slice(0, 5);
    if (topUsers.length === 0) {
        alert('Nenhum usuário salvo.');
        return;
    }
    var topUserInfo = 'Top 5 usuários com mais repositórios:\n';
    topUsers.forEach(function (user) {
        topUserInfo += "Nome: ".concat(user.name, ", Reposit\u00F3rios: ").concat(user.public_repos, "\n");
    });
    alert(topUserInfo);
}
// Função para exibir o menu interativo
function showMenu() {
    var option;
    do {
        option = prompt('Escolha uma opção:\n' +
            '1. Obter dados do usuário do GitHub\n' +
            '2. Mostrar informações do usuário e seus repositórios\n' +
            '3. Mostrar todos os usuários salvos\n' +
            '4. Calcular a soma de repositórios\n' +
            '5. Mostrar top 5 usuários com mais repositórios\n' +
            '6. Sair') || '';
        switch (option) {
            case '1':
                var username = prompt('Insira o nome de usuário do GitHub:') || '';
                fetchGitHubUser(username);
                break;
            case '2':
                var userToShow = prompt('Insira o nome de usuário do GitHub para mostrar informações:') || '';
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
