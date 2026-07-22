// ============================================================
// МОДУЛЬ МЕНЕДЖЕР
// ============================================================

const modules = {
    networks: () => import('../data/networks.js'),
    security: () => import('../data/security.js'),
    qa: () => import('../data/qa.js'),
    python: () => import('../data/python.js'),
    auto_tests: () => import('../data/auto_tests.js'),
    sql: () => import('../data/sql.js'),
    devops: () => import('../data/devops.js'),
};

export async function loadModule(moduleId) {
    try {
        const module = await modules[moduleId]();
        return module.module || module;
    } catch (e) {
        console.error(`❌ Ошибка загрузки модуля ${moduleId}:`, e);
        return null;
    }
}

export function getModuleInfo(moduleId) {
    const info = {
        networks: { title: 'Компьютерные сети', icon: '🌐' },
        security: { title: 'Кибербезопасность', icon: '🛡️' },
        qa: { title: 'QA тестирование', icon: '🧪' },
        python: { title: 'Python основы', icon: '🐍' },
        auto_tests: { title: 'Автотесты основы', icon: '🤖' },
        sql: { title: 'Базы данных (SQL)', icon: '🗄️' },
        devops: { title: 'DevOps', icon: '⚙️' },
    };
    return info[moduleId] || null;
}