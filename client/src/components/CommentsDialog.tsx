import { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

interface IComment {
  id: number;
  attributes: {
    body: string;
  }
}

interface ICommentsDialog {
  visible: boolean;
  onHide: () => void;
  onsubmit: (body: string) => void;
  featureId: number;
}

const CommentsDialog = ({ visible, onHide, featureId }: ICommentsDialog) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    if (visible) {
      fetch(`http://localhost:3000/api/features/${featureId}/comments`)
        .then(response => response.json())
        .then(data => setComments(data.data))
    }
  }, [visible, featureId])

  const handleSubmit = () => {
    fetch(`http://localhost:3000/api/features/${featureId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: {
          body: comment
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          setComments(prevComments => [...prevComments, data])
          setComment('')
        } else {
          console.error('Failed to submit comment')
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <Dialog header="Comentarios" visible={visible} onHide={onHide} style={{ width: '50vw' }} draggable={false}>
        <div className="p-field">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-4 border border-gray-300 rounded">
                <p className="m-0">{comment.attributes.body}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
        <div className='flex flex-col sticky bottom-0 bg-white p-4 m-0'>
          <label htmlFor="comment" className="p-d-block mt-4 text-lg uppercase text-bold text-black">Hacer comentario:</label>
          <InputTextarea id="comment" value={comment} onChange={(e) => setComment(e.currentTarget.value)} rows={5} cols={30} className="mt-2" />
          <Button label="Enviar" onClick={handleSubmit} className="mt-4" />
        </div>
      </Dialog>
    </>
  )
}

export default CommentsDialog