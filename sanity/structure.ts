import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ask Gamblers')
    .items([
      S.documentTypeListItem('casino').title('קזינו'),
      S.divider(),
      S.documentTypeListItem('post').title('פוסטים'),
      S.documentTypeListItem('category').title('קטגוריות'),
      S.documentTypeListItem('author').title('כותבים'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'casino'].includes(item.getId()!),
      ),
    ])
