# Настройка GitHub Pages

## Шаг 1: Настройка в репозитории

1. Перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите **"GitHub Actions"**
3. Сохраните изменения

## Шаг 2: Создание environment (если нужно)

Если workflow все еще падает с ошибкой environment:

1. Перейдите в **Settings** → **Environments**
2. Нажмите **"New environment"**
3. Назовите его **"github-pages"**
4. Нажмите **"Configure environment"**
5. Не добавляйте никаких protection rules
6. Сохраните

## Шаг 3: Проверка workflow

После push в main/master ветку:
1. Перейдите в **Actions**
2. Проверьте, что workflow запустился
3. Если есть ошибки, откройте их и проверьте логи

## Шаг 4: Проверка деплоя

После успешного деплоя сайт будет доступен по адресу:
`https://ваш-username.github.io/имя-репозитория/`

**Важно:** Имя репозитория должно точно совпадать с тем, что указано в URL!

## Решение проблем

### Ошибка: "Environment protection rules"
- Убедитесь, что environment "github-pages" существует и не имеет protection rules

### Ошибка: "Permission denied"
- Проверьте, что в Settings → Actions → General → Workflow permissions установлено "Read and write permissions"

### Ошибка: "404 Not Found" на сайте
- Проверьте, что base path в vite.config.ts совпадает с именем репозитория
- Убедитесь, что открываете правильный URL с именем репозитория

