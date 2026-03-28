import sys
import json
from pathlib import Path

# Список текстовых расширений, которые будут сохраняться
TEXT_EXTENSIONS = {
    '.json', '.mcfunction', '.mcmeta', '.txt', '.lang',
    '.properties', '.yaml', '.yml', '.toml'
}

# Расширения, которые нужно пропустить (изображения и бинарные файлы)
SKIP_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp',
    '.nbt', '.zip', '.rar', '.7z', '.tar', '.gz', '.dat', '.db'
}

def build_tree(path):
    """Рекурсивно строит дерево папок и текстовых файлов."""
    items = []
    for item in path.iterdir():
        if item.is_dir():
            # Рекурсивно обработать подпапку
            children = build_tree(item)
            items.append({
                "type": "directory",
                "name": item.name,
                "children": children
            })
        elif item.is_file():
            ext = item.suffix.lower()
            # Если расширение в списке текстовых – читаем содержимое
            if ext in TEXT_EXTENSIONS:
                try:
                    content = item.read_text(encoding='utf-8')
                    items.append({
                        "type": "file",
                        "name": item.name,
                        "content": content
                    })
                except Exception as e:
                    print(f"Warning: Could not read {item} as UTF-8: {e}", file=sys.stderr)
            # Если расширение в списке пропускаемых – игнорируем
            elif ext in SKIP_EXTENSIONS:
                continue
            else:
                # Для всех остальных расширений тоже пропускаем,
                # чтобы избежать бинарного мусора в JSON
                continue
    return items

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <datapack_path> [output_json]", file=sys.stderr)
        sys.exit(1)

    source_dir = Path(sys.argv[1])
    if not source_dir.is_dir():
        print(f"Error: {source_dir} is not a directory", file=sys.stderr)
        sys.exit(1)

    # Определяем выходной файл
    if len(sys.argv) >= 3:
        output_file = Path(sys.argv[2])
    else:
        output_file = Path("datapack_export.json")

    # Строим дерево
    tree = build_tree(source_dir)

    # Корневой объект
    result = {
        "name": source_dir.name,
        "type": "directory",
        "children": tree
    }

    # Записываем JSON с отступами для читаемости
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"Done. Exported to {output_file}")

if __name__ == "__main__":
    main()