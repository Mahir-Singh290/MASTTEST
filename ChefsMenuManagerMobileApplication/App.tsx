import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';

// define the dish data type so typescript knows what properties each dish has
type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

// initialize stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // central state initialized with starter, main, and dessert default items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Mozzarella Sticks',
      description: 'Crispy golden fried breaded mozzarella cheese sticks served with warm marinara dipping sauce.',
      course: 'Starter',
      price: '65.00',
    },
    {
      id: '2',
      name: 'Steak',
      description: 'Tender grilled sirloin steak seasoned with herbs and served with garlic butter and chips.',
      course: 'Main Course',
      price: '165.00',
    },
    {
      id: '3',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and whipped mascarpone cream :)',
      course: 'Dessert',
      price: '55.00',
    },
  ]);
  //https://react.dev/learn/rendering-lists

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#e02707' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false,
        }}
      >
        {/* main screen displaying current menu */}
        {/*https://www.reddit.com/r/reactnative/comments/gbexzz/commenting_in_reactnative/
        This link shows how to do this specific type of comment, because
        in MAST lectures we never did any comments in the code. So
        Throughout the entire code this type of comment and the // will be used */}

        <Stack.Screen name="MainScreen" options={{ title: 'Restaurant Menu' }}>
          {(props) => <MainScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
       {/*https://reactnavigation.org/docs/stack-navigator/
       This link shows where i learnt props */}
 
        {/* form screen to add a dish */}
        <Stack.Screen name="AddDishScreen" options={{ title: 'Add New Dish' }}>
          {(props) => <AddDishScreen {...props} setMenuItems={setMenuItems} menuItems={menuItems} />}
        </Stack.Screen>
           {/*https://reactnavigation.org/docs/stack-navigator/
       This link shows where i learnt props */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// helper function to check for empty strings
function isEmpty(value: string) {
  return (
    value == null ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor == Object && Object.keys(value).length === 0)
  );
}


// screen 1: mainsreen (display menu and total)
function MainScreen({ navigation, menuItems }: { navigation: any; menuItems: MenuItem[] }) {
  // render items array using a loop
  const renderMenuItems = () => {
    const arrOutput = [];

    for (let i = 0; i < menuItems.length; i++) {
      arrOutput.push(
        <View key={i} style={styles.resultCard}>
          <Text style={styles.resultLanguage}>{menuItems[i].name}</Text>
          <Text style={styles.inputLabel}>Course: {menuItems[i].course}</Text>
          <Text style={styles.description}>Description: {menuItems[i].description}</Text>
          <Text style={styles.resultLabel}>Price: R{menuItems[i].price}</Text>
        </View>
      );
    }
    return arrOutput;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.skillsScroll}>
        <View style={styles.appContainer}>
          
          {/* header banner section */}
          <Text style={styles.WelcomeTitle}>Chef Christoffel's Menu</Text>
          
          {/* total dish counter */}
          <View style={styles.skillsCounter}>
            <Text style={styles.skillsCounterText}>
              Total Dishes: {menuItems.length}
            </Text>
          </View>

          {/* display empty state message if no items exist */}
          {menuItems.length === 0 ? (
            <View style={styles.addSkillsCard}>
              <Text style={styles.sectionSubtitle}>
                No menu items added yet. Tap 'Add New Menu Item' below to create a dish.
              </Text>
            </View>
          ) : (
            <View style={styles.skillListSection}>
              <Text style={styles.sectionTitle}>Current Menu Items</Text>
              {renderMenuItems()}
            </View>
          )}

          {/* button to navigate to add dish screen */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AddDishScreen')}
          >
            <Text style={styles.primaryButtonText}>Add New Menu Item</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// screen 2: add dish screen 
function AddDishScreen({  navigation,setMenuItems,menuItems,}:
   {
  navigation: any;
  setMenuItems: any;
  menuItems: MenuItem[];
}) {
  // form states
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');
  const [Error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // form submission and validation logic
  const handleAddDish = () => {
    if (
      isEmpty(dishName) === false &&
      isEmpty(description) === false &&
      isEmpty(course) === false &&
      isEmpty(price) === false
    ) {
      const newDish: MenuItem = {
        id: Date.now().toString(),
        name: dishName,
        description: description,
        course: course,
        price: price,
      };

      setMenuItems([...menuItems, newDish]);

      setDishName('');
      setDescription('');
      setPrice('');
      setError('');
      setSuccessMessage('Menu item successfully added!');


    } else {
      setSuccessMessage('');
      setError('Please fill in all required fields!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.skillsScroll}>
        <View style={styles.appContainer}>
          <Text style={styles.WelcomeTitle}>Add a New Dish</Text>

          {/* validation error display */}
          {Error !== '' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{Error}</Text>
            </View>
          )}

          {/* confirmation success display */}
          {successMessage !== '' && (
            <View style={styles.greetingCard}>
              <Text style={styles.detailsSubtitle}>{successMessage}</Text>
            </View>
          )}

          {/* dish name input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Dish Name:</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. Garlic Bread"
              placeholderTextColor="#888"
              value={dishName}
              onChangeText={(text) => setDishName(text)}
            />
          </View>

          {/* description input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Description:</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. Freshly baked bread with butter and garlic"
              placeholderTextColor="#888"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          {/* course selection radio buttons */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Select Course:</Text>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Starter')}
            >
              <RadioButton
                value="Starter"
                status={course === 'Starter' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Starter')}
                color="#ff6600"
              />
              <Text style={styles.languageTitle}>Starter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Main Course')}
            >
              <RadioButton
                value="Main Course"
                status={course === 'Main Course' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Main Course')}
                color="#ff6600"
              />
              <Text style={styles.languageTitle}>Main Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => setCourse('Dessert')}
            >
              <RadioButton
                value="Dessert"
                status={course === 'Dessert' ? 'checked' : 'unchecked'}
                onPress={() => setCourse('Dessert')}
                color="#ff6600"
              />
              <Text style={styles.languageTitle}>Dessert</Text>
            </TouchableOpacity>
          </View>

          {/* price input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Price (R):</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g. 45.00"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>

          {/* add item action button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleAddDish}>
            <Text style={styles.primaryButtonText}>+ Save Menu Item</Text>
          </TouchableOpacity>

          {/* cancel button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => navigation.navigate('MainScreen')}
            //https://stackoverflow.com/questions/74266881/how-to-return-values-from-second-screen-to-first-screen
            //this website shows how to go back screen, well we did learn it, but what we did not learn was displaying items from screen 2 to screen 1
        
          >
            <Text style={styles.deleteButtonText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13b0c5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: 'red',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appContainer: {
    flex: 1,
    padding: 20,
  },
  skillsText: {
    fontSize: 15,
    marginVertical: 5,
    borderBottomColor: '#fa0707',
    borderBottomWidth: 0.5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ff0000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#ff0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modernInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  WelcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: '#8400ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#008000',
    fontWeight: 'bold',
  },
  greetingCard: {
    backgroundColor: '#e6ffe6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  languageOption: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff6600',
    marginTop: 5,
  },
  resultLanguage: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563EB',
  },
  addSkillsCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  skillsCounter: {
    backgroundColor: '#00e1ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  skillsCounterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skillListSection: {
    marginTop: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skillsScroll: {
    paddingBottom: 40,
  },
});