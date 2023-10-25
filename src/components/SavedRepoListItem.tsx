import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SavedRepo } from "../types/types";
import { styles } from "../styles/components/savedRepoListItem";

const SavedRepoListItem: React.FC<{
  repo: SavedRepo;
  handleDeleteRepo: (repoId: string) => void;
}> = ({ repo, handleDeleteRepo }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{repo.fullName}</Text>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.listItemText}>
        <Icon name="star" color="gold" size={24} /> {repo.stargazersCount}
      </Text>
      <TouchableOpacity
        onPress={() => handleDeleteRepo(repo.id)}
        style={{ marginLeft: 10 }}>
        <Icon name="trash" color="red" size={24} />
      </TouchableOpacity>
    </View>
  </View>
);

export default SavedRepoListItem;
