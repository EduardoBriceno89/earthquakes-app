import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react"
import CommentsDialog from "./CommentsDialog";

interface IFeatures {
  id: number;
  type: string;
  attributes: {
    external_id: string;
    magnitude: string;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  };
  links: {
    external_url: string;
  }
}

const Datatable = () => {
  const [features, setFeatures] = useState<IFeatures[]>([])
  const [commentsDialogVisible, setCommentsDialogVisible] = useState(false)
  const [selectedFeatureId, setSelectedFeatureId] = useState(0)

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/features')
      const data = await response.json()
      setFeatures(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="container mx-auto px-10">
        <div className="flex justify-center items-center">
          <DataTable value={features} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className="p-datatable-sm">
            <Column field="attributes.title" header="Título" sortable></Column>
            <Column field="attributes.place" header="Lugar" sortable></Column>
            <Column field="attributes.time" header="Tiempo" sortable></Column>
            <Column field="attributes.mag_type" header="Mag_type" sortable></Column>
            <Column field="attributes.magnitude" header="Magnitud" sortable></Column>
            <Column field="attributes.coordinates.latitude" header="Latitud" sortable></Column>
            <Column field="attributes.coordinates.longitude" header="Latitud" sortable></Column>
            <Column field="attributes.tsunami" header="Tsunami" sortable></Column>
            <Column field="links.external_url" header="Url" body={(rowData: IFeatures) => (
              <a href={rowData.links.external_url} target="_blank" rel="noopener noreferrer" className="truncate w-24 inline-block">
                {rowData.links.external_url}
              </a>
            )}></Column>
            <Column header="Comentarios" body={(rowData: IFeatures) => (
              <Button icon="pi pi-comments" rounded onClick={() => {
                setSelectedFeatureId(rowData.id)
                setCommentsDialogVisible(true)
              }} />
            )} />
          </DataTable>
          <CommentsDialog
            visible={commentsDialogVisible}
            onHide={() => setCommentsDialogVisible(false)}
            onsubmit={(body) => console.log(body)}
            featureId={selectedFeatureId}
          />
        </div>
      </div>
    </>
  )
}

export default Datatable