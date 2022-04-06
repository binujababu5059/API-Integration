import { View, Text, SafeAreaView , StyleSheet, ScrollView, Image } from 'react-native'
import React, {useState,useEffect} from 'react'

export default function App() {
  const [headerImage, setheaderImage] = useState(null);
  const [headeName, setheadeName] = useState(null);
  const [headerDescription, setheaderDescription] = useState(null);
  

  getItem = ()=> {
    const form = new FormData();
    form.append('warehouse_id',1)
    form.append(' product_id',182)
    console.log('########',form)

    fetch('https://test.freshandfetch.com/api/v1/product/detail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: form
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
      console.log('response....',Response.data)
      setheadeName(Response.data.product.name)
      setheaderImage(Response.data.product.image)
      setheaderDescription(Response.data.product.description)
    })
    .catch((error)=> {
      console.warn('error code',error)
  })  
  }
  
  useEffect(() => {
    getItem()
  }, [])

  return (
    <SafeAreaView style={Style.SafeAreaView}>
      <View style={Style.mainview}>
        <Text style={{fontSize:20,fontWeight:'800',color:'white'}}>Product List</Text>
      </View>
      <ScrollView style={Style.ScrollView}>
        <View style={{width:'100%',height :'100%',}}>
          <View style={{width:'100%',height:230,justifyContent:'center',alignItems:'center'}}>
            <Image source={{ uri: 'https://test.freshandfetch.com'+headerImage}} style={{width:'95%',borderRadius:15,resizeMode: 'stretch',height: '100%'}}></Image>
          </View>
          <View style={{padding:15,width:'100%',height:400,}}>
            <Text style={{color:'#000',fontSize:20,fontWeight:'800',marginBottom:9}}>{headeName}</Text>
            <Text style={{fontSize:17,fontWeight:'800',marginBottom:9}}>Price is based on whole product / Gross weight</Text>
            <Text style={{fontSize:16}}>{headerDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const Style = StyleSheet.create(
  {
    SafeAreaView:{

      flex:1,
    },
    mainview:{

      width:'100%',
      height:'7%',
      backgroundColor:'green',
      justifyContent:'center',
      alignItems:'center'
    },
    ScrollView:{

      width:'100%',
      height:'93%',
      marginTop:10
    },
    Image:{

      borderRadius:2558
    }
  }
)



