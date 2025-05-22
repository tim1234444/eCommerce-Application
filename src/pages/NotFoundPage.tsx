import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>404 — Страница не найдена</h1>
      <p>Извините, страница, которую вы ищете, не существует.</p>
      <Link to="/" style={{ marginTop: '1rem', display: 'inline-block' }}>
        ⬅ Вернуться на главную
      </Link>
    </div>
  );
}
