// app/projects/[id]/page.tsx 
  
interface Project { id: string; name: string; color: string; } 
  
interface Props { 
  params: Promise<{ id: string }>; 
} 
  
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>❌ Projet non trouvé</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Le projet avec l'ID <strong>{id}</strong> n'existe pas ou a été supprimé.
        </p>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>
          Erreur: {res.status} {res.statusText}
        </p>
        <a href="/dashboard" style={{ color: '#3b82f6', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
          ← Retour au Dashboard
        </a>
      </div>
    );
  } 
  
  const project: Project = await res.json(); 
  
  return ( 
    <div style={{ padding: '2rem' }}> 
      <h1> 
        <span style={{ 
          display: 'inline-block', width: 16, height: 16, 
          borderRadius: '50%', background: project.color, marginRight: 8 
        }} /> 
        {project.name} 
      </h1> 
      <p>ID : {project.id}</p> 
      <a href="/dashboard">← Retour au Dashboard</a> 
    </div> 
  ); 
} 