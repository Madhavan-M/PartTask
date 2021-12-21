import { LightningElement,wire,track } from 'lwc';
import PARTNUMBER from '@salesforce/schema/Part__c.Part_Number__c';
import PARTNAME from '@salesforce/schema/Part__c.Name';
import PARTDESCRIPTION from '@salesforce/schema/Part__c.Part_Description__c';
import MEASUREMENT from '@salesforce/schema/Part__c.Measurement__c';
import STATUS from '@salesforce/schema/Part__c.Status__c';
import getParts from '@salesforce/apex/PartController.getParts';

const COLUMNS = [
    { label: 'Part Name', fieldName: PARTNAME.fieldApiName, type: 'text' },
    { label: 'Part Number', fieldName: PARTNUMBER.fieldApiName, type: 'text' },
    { label: 'Part Description', fieldName: PARTDESCRIPTION.fieldApiName, type: 'text' },
    { label: 'Measurement', fieldName: MEASUREMENT.fieldApiName, type: 'text' },
    { label: 'Status', fieldName: STATUS.fieldApiName, type: 'text' },

];

export default class Parts extends LightningElement {
    
    columns = COLUMNS;
    @wire(getParts)
    parts;

    @track customFormModal = false;  
    @track customFormModal1 = false;
    @track customFormModal2 = false;

    customShowModalPopup() {            
        this.customFormModal = true;
    }
 
    customHideModalPopup() {    
        this.customFormModal = false;
    }
    customShowModalPopup1() {            
        this.customFormModal1 = true;
    }
 
    customHideModalPopup1() {    
        this.customFormModal1 = false;
    }
    customShowModalPopup2() {            
        this.customFormModal2 = true;
    }
 
    customHideModalPopup2() {    
        this.customFormModal2 = false;
    }
    items = [
        {
            label: 'Metal',
            name: '1',
            expanded: true,
            items: [
                {
                    label: 'Bolts',
                    name: '2',
                    expanded: true,
                    items: [],
                },
                        {
                            label: 'Nuts',
                            name: '3',
                            expanded: true,
                            items: [],
                        },
                        {
                            label: 'Screws',
                            name: '4',
                            expanded: true,
                        },
            ],
        },]

        strName;
        strDescrip;
        strStatus;
        strUrl;
        strCost;
        strMeasure;
        @track fieldVisible = false;
    
        saveName(event){
            this.strName = event.target.value;
        }
        saveDesc(event){
            this.strDescrip = event.target.value;
        }
        saveUnit(event){
            this.value1 = event.target.value;
        }
        saverad1(event){
            this.value3 = event.target.value;
        }
        saverad2(event){
            this.value4 = event.target.value;
        }
        saveMeasure(event){
            this.strMeasure = event.target.value;
        }
        saveStatus(event){
            this.strStatus = event.target.value;
        }
        save3D(event){
            this.strUrl = event.target.value;
        }
        saveCost(event){
            this.strCost = event.target.value;
        }
    
        // saverad1(event){
        //     const selectedOption = event.detail.value;
        //     if (selectedOption == 'option1')
        //     {
        //         this.fieldVisible = true;
        //     }
        //     else
        //     {
        //         this.fieldVisible = false;
        //     }
            
        // }
    
    
        createAccount(){
            var fields = {'Name' : this.strName, 'Part_Description__c' : this.strDescrip, 'Unit_of_Measure__c' : this.value1,
            'Measurement__c' : this.strMeasure, 'Status__c' : this.strStatus, 'Cost__c' : this.strCost,
            // 'Part_Category__c' : this.value3, 'Part_Procurement__c' : this.value4,
        };
    
            if(!this.strName || !this.strDescrip || !this.strMeasure || !this.strStatus || !this.strUrl || !this.strCost){
                this.dispatchEvent(
                    new ShowToastEvent({
                        variant : 'Error',
                        message : 'Fill all the Required Fields'
                    }) 
                );          
            } 
            else{
                var objRecordInput = {'apiName':'Part__c',fields};
                createRecord(objRecordInput).then(Response => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title : 'Success',
                            message : 'New Part Created Successfully!!',
                            variant : 'Success'
                        }) 
                    );
                })                 
            }
        }
        value ='';
        get options1(){
            return [
                { label: 'Centimeter (cm)', value: 'Centimeter (cm)'},
                { label: 'Millimeter (mm)', value: 'Millimeter (mm)' },
                { label: 'Micrometer (um)', value: 'Micrometer (um)' },
            ];
        }
        
}
