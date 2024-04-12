import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react"

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
      <div className="flex justify-center">
        <DataTable value={features} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} scrollable>
          <Column field="attributes.title" header="Title" sortable></Column>
          <Column field="attributes.place" header="Place" sortable></Column>
          <Column field="attributes.time" header="Time" sortable></Column>
          <Column field="attributes.magnitude" header="Magnitude" sortable></Column>
          <Column field="attributes.tsunami" header="Tsunami" sortable></Column>
          <Column field="links.external_url" header="Url"></Column>
          <Column header="Comments">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

          </Column>
        </DataTable>
      </div>
    </>
  )
}

export default Datatable