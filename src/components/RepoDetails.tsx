import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RepositoryDetails } from '../types/types';
import { styles } from '../styles/components/repoDetailsStyles';

interface RepoDetailsProps {
  repository: RepositoryDetails;
  onSaveRepository: () => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({
  repository,
  onSaveRepository,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsItem}>
          <Icon name="code" size={20} color="gray" />
          <Text style={styles.detailsText}>
            Language: {repository.language}
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Icon name="star" size={20} color="gold" />
          <Text style={styles.detailsText}>
            Stars: {repository.stargazers_count}
          </Text>
        </View>
      </View>
      <Button title="Save to Server" onPress={() => onSaveRepository()} />
    </View>
  );
};

export default RepoDetails;
