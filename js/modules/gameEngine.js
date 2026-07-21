// ============================================================
// ИГРОВОЙ ДВИЖОК
// ============================================================

import { detective } from '../games/detective.js';
// TODO: импорт других игр

export function startGame(moduleData, lessonData) {
    const gameType = moduleData.game || 'match3';
    
    console.log(`🎮 Запускаем игру: ${gameType} для модуля ${moduleData.id}`);
    
    switch (gameType) {
        case 'match3':
            // Используем существующую логику из app.js
            // (она уже реализована в startPractice)
            return 'match3';
            
        case 'detective':
            return startDetectiveGame(moduleData, lessonData);
            
        // TODO: другие игры
        // case 'bug_hunter':
        //     return startBugHunter(moduleData, lessonData);
        // case 'test_quest':
        //     return startTestQuest(moduleData, lessonData);
            
        default:
            console.error(`❌ Неизвестный тип игры: ${gameType}`);
            return null;
    }
}

function startDetectiveGame(moduleData, lessonData) {
    // Находим кейс, связанный с текущим уроком
    const caseData = detective.getCaseById(lessonData.id) || detective.cases[0];
    
    if (!caseData) {
        console.error('❌ Кейс не найден');
        return null;
    }
    
    console.log(`🕵️ Запускаем кейс: ${caseData.title}`);
    
    // Возвращаем данные кейса для рендеринга
    return {
        type: 'detective',
        case: caseData,
        quickQuestions: caseData.quickQuestions || [],
        caseQuestions: caseData.caseQuestions || []
    };
}

export function getGameInfo(gameType) {
    const games = {
        match3: {
            title: 'Три в ряд',
            icon: '🎮',
            description: 'Собирай комбинации для прогресса'
        },
        detective: {
            title: 'Кибердетектив',
            icon: '🕵️',
            description: 'Расследуй киберпреступления'
        }
        // TODO: другие игры
    };
    return games[gameType] || null;
}