import Link from 'next/link';
function ClientsPage() {
  const clients = [
    { id: 'max', name: 'Maximilian' },
    { id: 'manu', name: 'Manuel' },
  ];
  return (
    <div>
      <h1>The CLients page</h1>
      <ul>
        {clients.map((client) => (
          <li>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
