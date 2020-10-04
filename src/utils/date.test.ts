import { formatDate } from './date';

describe('formatDate', () => {
  const now = new Date('2020-10-04 17:19:39');
  test('作成してすぐ', () => {
    expect(formatDate(new Date(now), now)).toEqual({
      datetime: '2020/10/04 17:19',
      isNew: true,
    });
  });
  test('一週間以上経った場合', () => {
    expect(formatDate(new Date('2020/10/11 17:19:40'), now)).toEqual({
      datetime: '2020/10/11 17:19',
      isNew: false,
    });
  });
});
