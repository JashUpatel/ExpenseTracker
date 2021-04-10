import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableHighlight,Modal,Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddExpence from './AddExpence';


// import Expences Block
import ExpenceBlock from './ExpenceBlock';


// const Receivables=({expences})=>(

//     <ScrollView>
//         <View style={style.container}>

//             <View style={style.month}>
//                 <Text style={style.monthText}>February, <Text style={style.digit}>2021</Text></Text>
//             </View>

//             <View style={style.date}>
//                 <Text style={style.dateText}><Text style={style.dateDigit}>16</Text>  Feb 21, Tue</Text>
//             </View>
//             <ExpenceBlock expences={expences} />

//             {/* {
//                   this.props.expences.map(expence=>(
//                     <View style={styles.formRow,{backgroundColor:'Green',flex:1,zIndex:1}}>
//                     <Text style={{fontSize:15,fontWeight:'bold'}}>{expence.desc}</Text>
//                     </View>
//                     )
//                 )
//               } */}

//         </View>
//     </ScrollView>
// );

class Receivables extends Component{
    
    constructor(props){
        super(props);
        // const [modalVisible, setModalVisible] = useState(false);
        this.state={
            modalVisible:false,
        }

        this.setModalVisible=this.setModalVisible.bind(this);
        this.addFunc=this.addFunc.bind(this);
        this.recievableFilter = this.recievableFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        // this.distinctDateExpences = this.distinctDateExpences.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        // this.monthDisp = this.monthDisp.bind(this);
        // this.monthYearDisp = this.monthYearDisp.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);


    }

    monthlyFilter(expence){
        var monthArr = []
        var monthlyFilterExpence = []
        var total=0
        expence.forEach(el=>{
         if(!monthArr.includes(el.date.slice(4,10))){
           let newFormat={
             month:el.date.slice(4,10),
             total:el.amount,
             expences:[el]
           }
           monthlyFilterExpence.push(newFormat)
           monthArr.push(el.date.slice(4,10))
         }
         else{
           let indx = monthlyFilterExpence.findIndex((e)=>(el.date.slice(4,10)==e.month));
           monthlyFilterExpence[indx].total=parseInt(monthlyFilterExpence[indx].total)+parseInt(el.amount)
           monthlyFilterExpence[indx].expences.push(el)
         }    

        });

        return monthlyFilterExpence;
      }


      dateFilter(expence){
       var dateArr = []
       var dateFilterExpence = []
       var total=0
       expence.forEach(el=>{
        if(!dateArr.includes(el.date)){
          let newFormat={
            date:el.date,
            total:el.amount,
            expences:[el]
          }
          dateFilterExpence.push(newFormat)
          dateArr.push(el.date)
        }
        else{
          let indx = dateFilterExpence.findIndex((e)=>(el.date==e.date));
          dateFilterExpence[indx].total=parseInt(dateFilterExpence[indx].total)+parseInt(el.amount)
          dateFilterExpence[indx].expences.push(el)
        }    

       });

       return dateFilterExpence;
     }

     getDayName(date){

        var WeekArr=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var dateArr = date.split('/');
         var dd = dateArr[0];
         var mm = dateArr[1];
         var yyyy = dateArr[2];
         var d = new Date(mm+'/'+dd+'/'+yyyy);
        
         var week = d.getDay();
      return WeekArr[week];

       }

       getMonthName(date){
         var dateArr = date.split('/');
         var dd = dateArr[0];
         var mm = dateArr[1];
         var yyyy = dateArr[2];
         var monthArr=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      var d = new Date(mm+'/'+dd+'/'+yyyy);
      var month = d.getMonth();
      return monthArr[month];

       }




    distinctDateExpences(data){
        const map = new Map();
        for (const item of data) {
            if(!map.has(item.date)){
                map.set(item.date, [item]);    // set any value to Map
              }
            else{
              map.get(item.date).push(item);
            }
        }
        return map
        }


    recievableFilter(data){

        var receivables=[];
        data.forEach(element => {
          if(element.paidBy=="You" && element.splitWith!="None" && element.status=="Unpaid"){
            receivables.push(element);
          }
        });

        return receivables;

    }

    addFunc(newExpence){
        this.props.receivables.push(newExpence);
    }

    sortByDate(a, b) {

        var arr1 = a.date.split('/');
        var arr2 = b.date.split('/');
        var d1 = arr1[1]+'/'+arr1[0]+'/'+arr1[2];
        var d2 = arr2[1]+'/'+arr2[0]+'/'+arr2[2];
        var x= new Date(d1); // js date format mmddyyyy
        var y = new Date(d2);
        if (x < y) {
            return 1;
        }
        if (x > y) {
            return -1;
        }
        return 0;
    }

    // sortByDate(a, b) {
    //     if (a.date < b.date) {
    //         return 1;
    //     }
    //     if (a.date > b.date) {
    //         return -1;
    //     }
    //     return 0;
    // }


    setModalVisible(){
        this.setState({modalVisible:!this.state.modalVisible});
    }
    render(){
    const data = this.props.receivables;
    var receivables = this.recievableFilter(data);
    receivables.sort(this.sortByDate);
    // var distinctDateMapData = this.distinctDateExpences(receivables);

    var monthlyFilterArr = this.monthlyFilter(receivables);

    // var MapKeys = [...distinctDateMapData.keys()]

    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
    
        <View style={style.container}>

            {/* <View style={style.month}>
                <Text style={style.monthText}>February, <Text style={style.digit}>2021</Text></Text>
            </View>

            <View style={style.date}>
                <Text style={style.dateText}><Text style={style.dateDigit}>16</Text>  Feb 21, Tue</Text>
            </View> */}

            {/* <ExpenceBlock expences={data} /> */}
            

            {

                // display date wise exp
                // MapKeys.map(el=>(
                //     <View>
                //     <View style={style.date}>
                //     <Text style={style.dateText}>{el}  </Text>
                //     </View>
                //     {/* <Text style={style.digit} >{el}</Text> */}
                // { distinctDateMapData.get(el).map(x=>(<ExpenceBlock expences={x}/>))}
                // </View>
                // ))

            }



            {


            monthlyFilterArr.map(el=>{
            var dateFilterArr=this.dateFilter(el.expences)
            return(
                <View>
                    <View style={style.month}>
            <Text style={style.monthText}>{this.getMonthName(el.expences[0].date)},<Text style={style.digit}>{el.month.split("/")[1]}</Text>  -  ${el.total}</Text>
                    </View>
                    {dateFilterArr.map(d=>{
                    return(
                        <View>
                        <View style={style.date}>
                        <View style={style.date}>
                    <Text style={style.dateText}><Text style={style.dateDigit}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, {this.getDayName(d.date).slice(0,3)}   -   ${d.total}</Text>
                    </View>
                    </View>
                        { d.expences.map(x=>(<ExpenceBlock expences={x}/>))}

                    </View>
                    )
                    })}

            </View>
            )
            })


            }

            
            {/* {
                receivables.map(expence => (
            <ExpenceBlock expences={expence} />

                ))
            } */}

        </View>
        
                
    </ScrollView>
  

    <View style={{flex:1,position:'absolute',bottom:5,right:15,alignSelf:'flex-end'}}>
    <View style={{position:'absolute',bottom:5,right:15,alignSelf:'flex-end'}}>
        <View style={{alignItems:'center'}}>
                <TouchableHighlight elevation style={style.button} underlayColor='#137863' onPress={() => this.setModalVisible(true)}>
                <Text style={style.add}>+</Text>
                </TouchableHighlight>

        </View>

    </View>
  </View>

  <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.modalVisible}
                    onDismiss = {() => this.setModalVisible() }
                    onRequestClose = {() => this.setModalVisible() }>
                        <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/>
                        <Button 
                            onPress = {() =>this.setModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
                </Modal>


</View>
   
)}
};

export default Receivables;

const style = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:20,
    },
    monthText:{
        fontWeight:'bold',
        fontSize:13.75,
        paddingHorizontal:50,
        paddingVertical:2.5,
        marginVertical:7.5,
        borderWidth:0.75,
        borderRadius:25,
    
    },
    month:{
        justifyContent:"center",
        alignItems:"center",
        // borderWidth:0.75,
        // borderRadius:25,
    },
    date:{
        justifyContent:'flex-start'
    },
    dateText:{
        fontWeight:'bold',
        fontSize:15,
    },
    dateDigit:{
        fontSize:25,
    },
    digit:{
        // justifyContent:"center",
        fontFamily:'monospace',
        fontWeight:"bold",
    },
    add:{
        fontSize: 32,
        color:'white',
        fontFamily:'monospace',
        fontWeight:'bold',
        // marginVertical: -16,
      },
      button:{
        // position:'absolute',
        // top:100,
        // left:10,
        height:60,
        width:60,
        borderWidth:1,
        borderColor:'white',
        borderRadius:50,
        // marginTop:75,
        padding:0,
        alignSelf:'flex-end',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1cc29f'
      },
      modal: {
        justifyContent: 'center',
        margin: 20,
        backgroundColor:'#fff'
     },
});