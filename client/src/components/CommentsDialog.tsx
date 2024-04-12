import { useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

interface ICommentsDialog {
  visible: boolean;
  onHide: () => void;
  onsubmit: (body: string) => void;
}

const CommentsDialog = ({ visible, onHide, onsubmit }: ICommentsDialog) => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    onsubmit(comment)
    setComment('')
    onHide()
  }

  return (
    <div>
      <Dialog header="Comments" visible={visible} onHide={onHide} style={{ width: '50vw' }}>
        <div className="p-field">
          <label htmlFor="comment" className="p-d-block">Comment</label>
          <InputTextarea id="comment" value={comment} onChange={(e) => setComment(e.currentTarget.value)} rows={5} cols={30} />
        </div>
        <Button label="Submit" onClick={handleSubmit} />
      </Dialog>
    </div>
  )
}

export default CommentsDialog