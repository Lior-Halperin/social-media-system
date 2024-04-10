import DonateTable from "src/Components/DonateTable/DonateTable";
import { IDonateModel } from "src/Models/DonateModel";

function DonateListView(): JSX.Element{
    
    const donateList: IDonateModel[]=[{id:1,city:'aaa',name:"mor",serialNumber:2,street:"bb",tal:"525"},
    {id:1,city:'bbbb',name:"or",serialNumber:5,street:"cccc",tal:"666"}
    ]

    return(
        <>
        <DonateTable donate={donateList}/>
        </>
    )
}

export default DonateListView;