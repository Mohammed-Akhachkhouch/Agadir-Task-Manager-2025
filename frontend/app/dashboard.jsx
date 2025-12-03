// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function DashboardScreen() {
//   const router = useRouter();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       <Text style={styles.title}>Dashboard</Text>

  
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Welcome Back!</Text>
//         <Text style={styles.cardText}>
//           Here you can manage your profile, view stats, and access different app features.
//         </Text>
//       </View>

     
//       <View style={styles.buttonWrapper}>

//         <TouchableOpacity 
//           style={styles.btn}
//           onPress={() => router.push('/profile')}
//         >
//           <Text style={styles.btnText}>Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.btn}
//           onPress={() => router.push('/settings')}
//         >
//           <Text style={styles.btnText}>Settings</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.btn, styles.logoutBtn]}
//           onPress={() => router.push('/login')}
//         >
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>

//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#111',
//     padding: 25,
//     paddingBottom: 40
//   },

//   title: {
//     fontSize: 30,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 25,
//     textAlign: 'center'
//   },

//   card: {
//     backgroundColor: '#1c1c1c',
//     padding: 20,
//     borderRadius: 15,
//     marginBottom: 25,
//     borderWidth: 1,
//     borderColor: '#333'
//   },

//   cardTitle: {
//     color: '#4b9fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8
//   },

//   cardText: {
//     color: '#aaa',
//     fontSize: 16,
//     lineHeight: 22
//   },

//   buttonWrapper: {
//     gap: 15,
//     marginTop: 10
//   },

//   btn: {
//     backgroundColor: '#4b9fff',
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center'
//   },

//   btnText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },

//   logoutBtn: {
//     backgroundColor: 'transparent',
//     borderWidth: 2,
//     borderColor: '#ff5252'
//   },

//   logoutText: {
//     color: '#ff5252',
//     fontSize: 18,
//     fontWeight: 'bold'
//   }
// });









import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); 

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Error loading tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "done") return t.status === "done";
    return true;
  });

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.date}>📅 {new Date(item.due_date).toLocaleDateString()}</Text>

      <TouchableOpacity
        style={[styles.statusBtn, item.status === "done" ? styles.done : styles.pending]}
        onPress={() => router.push(`/task/${item.id}`)}
      >
        <Text style={styles.statusText}>
          {item.status === "done" ? "Terminée" : "En attente"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Hello 👋</Text>
      <Text style={styles.subHeader}>How Money Of Tache Do It Today</Text>

      <View style={styles.filters}>
        <TouchableOpacity 
          style={[styles.filterBtn, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterText}>All Task</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterBtn, filter === "pending" && styles.activeFilter]} 
          onPress={() => setFilter("pending")}
        >
          <Text style={styles.filterText}>En attente</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterBtn, filter === "done" && styles.activeFilter]} onPress={() => setFilter("done")}
        >
          <Text style={styles.filterText}>Complete</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/add-task")}>
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#111", padding: 20,
  },

  header: {
    fontSize: 28, color: "#fff", fontWeight: "bold",
  },

  subHeader: {
    color: "#999", marginBottom: 20,
  },

  filters: {
    flexDirection: "row",justifyContent: "space-between", marginBottom: 20,
  },

  filterBtn: {
    paddingVertical: 10,paddingHorizontal: 15,backgroundColor: "#222",borderRadius: 10,
  },

  activeFilter: {
    backgroundColor: "#4b9fff",
  },

  filterText: {
    color: "#fff",fontWeight: "bold",
  },

  taskCard: {
    backgroundColor: "#1c1c1c",padding: 15,marginBottom: 15,borderRadius: 12,borderWidth: 1, borderColor: "#333",
  },

  title: {
    color: "#fff",
    fontSize: 18,fontWeight: "bold",
  },

  desc: {
    color: "#aaa",marginTop: 5,
  },

  date: {
    color: "#4b9fff",
    marginTop: 8,
  },

  statusBtn: {
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  pending: {
    backgroundColor: "#3a3a3a",
  },

  done: {
    backgroundColor: "green",
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },

  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 25,
    backgroundColor: "#4b9fff",
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 15,
  },

  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
