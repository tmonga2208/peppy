import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
} from 'react-native';
import {
  Home,
  Clock,
  User,
  HelpCircle,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
} from 'react-native-feather';

const ProfileScreen = () => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(true);

  const MenuItem = ({ icon, title, badge, hasToggle, isToggled, onToggle, isDestructive }: { icon: JSX.Element, title: string, badge?: string, hasToggle?: boolean, isToggled?: boolean, onToggle?: (value: boolean) => void, isDestructive?: boolean }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      disabled={hasToggle}
    >
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={[
          styles.menuItemText,
          isDestructive && styles.destructiveText
        ]}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        {hasToggle ? (
          <Switch
            value={isToggled}
            onValueChange={onToggle}
            trackColor={{ false: '#e4e4e4', true: '#34C759' }}
          />
        ) : (
          <ChevronRight stroke="#C7C7CC" width={20} height={20} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri:"./tm.png"}}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.username}>Tarun Monga</Text>
        <Text style={styles.email}>tarunmonga2208@icloud.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Inventories</Text>
        <MenuItem
          icon={<HelpCircle stroke="#000" width={20} height={20} />}
          title="Notificatons"
          badge="2"
        />
        <MenuItem
          icon={<HelpCircle stroke="#000" width={20} height={20} />}
          title="Support"
        />

        <Text style={[styles.sectionTitle, styles.preferencesTitle]}>Preferences</Text>
        <MenuItem
          icon={<Bell stroke="#000" width={20} height={20} />}
          title="Push notifications"
          hasToggle
          isToggled={pushEnabled}
          onToggle={setPushEnabled}
        />
        <MenuItem
          icon={<Lock stroke="#000" width={20} height={20} />}
          title="Face ID"
          hasToggle
          isToggled={faceIdEnabled}
          onToggle={setFaceIdEnabled}
        />
        <MenuItem
          icon={<Lock stroke="#000" width={20} height={20} />}
          title="PIN Code"
        />
        <MenuItem
          icon={<LogOut stroke="#FF3B30" width={20} height={20} />}
          title="Logout"
          isDestructive
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E1F8CF',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  preferencesTitle: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  badge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
  navItemActive: {
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
  },
});

export default ProfileScreen;